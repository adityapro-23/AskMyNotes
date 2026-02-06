import { getAuthUserId } from "@convex-dev/auth/server";
import { internalAction, internalMutation, internalQuery, mutation } from "./_generated/server";
import { convexToJson, v } from "convex/values";
import { query } from "./_generated/server";

export const createNoteWithEmbeddings = internalMutation({
    args: {
        title: v.string(),
        body: v.string(),
        userId: v.id("users"),
        embeddings: v.array(
            v.object({
                embedding: v.array(v.float64()),
                content: v.string(),
            })
        )
    },
    returns: v.id("notes"),
    handler: async(ctx, args) => {
        const noteId = await ctx.db.insert("notes", {
            title: args.title,
            body: args.body,
            userId: args.userId,
        });

        for(const embeddingData of args.embeddings) {
            await ctx.db.insert("noteEmbeddings", {
                content: embeddingData.content,
                embedding: embeddingData.embedding,
                noteId,
                userId: args.userId
            })
        }

        return noteId;
    },
});

export const getUserNotes = query({
    args: {},
    handler: async(ctx) => {
        const userId = await getAuthUserId(ctx);
        if(!userId) {
            return [];
        }

        return await ctx.db
            .query("notes")
            .withIndex("by_userId", q => q.eq("userId", userId))
            .order("desc") // newest note at top (acc to creation time)
            .collect();
    }
});

export const deleteNote = mutation({
    args: {
        noteId: v.id("notes"),
    },
    handler: async(ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if(!userId) {
            throw new Error("User must be authenticated to perform this action")
        }

        const note = await ctx.db.get(args.noteId);
        if(!note) {
            throw new Error("Note not found!");
        }

        if(note.userId !== userId) {
            throw new Error("User is not authorized to delete this note.");
        }

        const embeddings = await ctx.db
            .query("noteEmbeddings")
            .withIndex("by_noteId", q => q.eq("noteId", args.noteId))
            .collect();

        for(const embedding of embeddings) {
            await ctx.db.delete(embedding._id);
        }

        await ctx.db.delete(args.noteId);
    },
});

export const fetchNotesByEmbeddingIds = internalQuery({
    args: {
        embeddingIds: v.array(v.id("noteEmbeddings")),
    },
    handler: async(ctx, args) => {
        const embeddings = [];
        for(const id of args.embeddingIds) {
            const embedding = await ctx.db.get(id);
            if(embedding !== null) {
                embeddings.push(embedding);
            }
        }
        
        // Multiple embeddings can belong to the same note id so we dont want
        // to fetch the same note again. So to implement this, we put all the
        // note ids in a set
        const uniqueNoteIds = [
            ...new Set(embeddings.map(embedding => embedding.noteId))
        ]

        const results = [];
        for(const id of uniqueNoteIds) {
            const note = await ctx.db.get(id);
            if(note !== null) {
                results.push(note);
            }
        }

        return results;
    },
});