import React, { Dispatch, SetStateAction, useState } from 'react'
import { BACKEND_URL } from "@/utilities/config";
import { Comment } from '@/types';
import {
    Box,
    Flex,
    IconButton,
    Link,
    Text,
    TextField,
    Theme
} from "@radix-ui/themes";
import { ConfirmDialog } from '@/components/UI/ConfirmDialog';
import { Send, Trash2, Undo2, UserRound } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatCommentDateTime } from '@/lib/formatTime';
import { useProjectStore } from '@/stores/useProjectStore';

type CommentsProps = {
  getComments: (fileID: string) => Promise<void>;
  getUnreadComments: () => Promise<void>;
  setaudioId: Dispatch<SetStateAction<string>>;
  setComments: (comments: Comment[] | null) => void;
  audioId: string;
  comments: Comment[] | null;
};

export default function Comments({
    getComments,
    getUnreadComments,
    setaudioId,
    audioId,
    comments
  }: CommentsProps) {
  const [commentInput, setCommentInput] = useState("");
  const [deleteCommentDialogOpen, setDeleteCommentDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const user = useAuthStore(state => state.user);
  const increaseCommentUpdates = useProjectStore(state => state.increaseCommentUpdates);

  async function postComments(fileID: string) {
    if (!commentInput.trim()) return;

    try {
      const response = await fetch(`${BACKEND_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: commentInput,
          fileId: fileID,
          timestamp: 1,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        increaseCommentUpdates();
        setCommentInput("");
        await getComments(fileID);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteComment(commentId: string, fileID: string) {
    try {
      const response = await fetch(
        `${BACKEND_URL}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        await getComments(fileID);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex className="w-full flex-col max-w-[940px] m-auto items-center gap-md">
      <Flex className="w-full justify-end">
        <Link
          onClick={() => {
            setaudioId("");
            getUnreadComments();
          }}
          className="flex items-center gap-xs cursor-pointer"
        >
          <Undo2 className="icon-xs" />
          Back
        </Link>
      </Flex>

      <Theme
        appearance="light"
        className="bg-transparent w-full"
      >
        <TextField.Root
          onChange={e =>
            setCommentInput(e.target.value)
          }
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey && commentInput.length > 0) {
              e.preventDefault();
              postComments(audioId);
            }
          }}
          value={commentInput}
          placeholder="Enter your comment here…"
          className="text-body-s overflow-hidden"
        >
          <TextField.Slot
            side="right"
            className="pr-0 text-body-s"
          >
            <IconButton
              radius="none"
              aria-label="Send"
              disabled={!commentInput}
              onClick={() =>
                postComments(audioId)
              }
            >
              <Send className="icon-sm" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Theme>

      <Flex className="w-full">
        {comments && comments.length === 0 && (
          <Flex className="flex items-center justify-center w-full ">
            <span className="flex-1 border-t"></span>
            <span className="px-4">
              No comments yet
            </span>
            <span className="flex-1 border-t"></span>
          </Flex>
        )}

        {comments && comments.length > 0 && (() => {
          const sorted = comments
            .slice()
            .sort((a, b) => new Date(b.createdAt)
            .getTime() - new Date(a.createdAt)
            .getTime(),
            );

          const isSameDay = ( d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

          const now = new Date();

          return (
            <ul className="gap-md flex flex-col w-full">
              {sorted.map(
                (comment, index) => {
                  const currentDate = new Date(comment.createdAt);
                  const nextComment = sorted[index + 1];
                  const nextDate = nextComment
                    ? new Date(nextComment.createdAt)
                    : null;
                  const insertSeparator = nextDate &&
                    isSameDay(currentDate, now) &&
                    !isSameDay(nextDate, now);

                  return (
                    <React.Fragment key={index}>
                      <li className="flex flex-col gap-xxs bg-highlight p-md rounded-custom overflow-hidden">
                        <Flex className="gap-sm w-full items-start md:items-center">
                          <Box>
                            {comment.author.id === user?.id ? (
                              <UserRound className="icon-xs lg:icon-sm size-xl owner-gradient rounded-full" />
                            ) : (
                              <UserRound className="icon-xs lg:icon-sm size-xl collaborator-gradient rounded-full" />
                            )}
                          </Box>

                          <Flex className="flex-col md:flex-row gap-xs shrink">
                            <Text>
                              {comment.author.username}
                              {comment.author.id === user?.id && " (you)"}
                            </Text>
                            <Text className="text-muted font-medium">
                              {formatCommentDateTime(comment.createdAt)}
                            </Text>
                          </Flex>

                          {comment.author.id === user?.id && (
                            <Trash2
                              className="icon-xs ml-auto cursor-pointer shrink-0"
                              onClick={() => {
                                setCommentToDelete(comment);
                                setDeleteCommentDialogOpen(true);
                              }}
                            />
                          )}
                        </Flex>

                        <Text className="text-body-s mt-xs">
                          {comment.content}
                        </Text>
                      </li>

                      {insertSeparator && (
                        <li className="flex items-center justify-center w-10/12 m-auto">
                          <span className="flex-1 border-t"></span>
                          <span className="px-4">
                            New comments
                          </span>
                          <span className="flex-1 border-t"></span>
                        </li>
                      )}
                    </React.Fragment>
                  );
                },
              )}
            </ul>
          );
        })()}
      </Flex>

      <ConfirmDialog
        open={deleteCommentDialogOpen}
        onOpenChange={open => {
          setDeleteCommentDialogOpen(open);
          if (!open) setCommentToDelete(null);
        }}
        onConfirm={async () => {
          if (!commentToDelete) return;
          setIsDeletingComment(true);
          await deleteComment(commentToDelete.id, audioId);
          setIsDeletingComment(false);
          setDeleteCommentDialogOpen(false);
          setCommentToDelete(null);
        }}
        onCancel={() => setCommentToDelete(null)}
        title="Delete comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={isDeletingComment}
      />
    </Flex>
  )
}
