import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

export default function DeleteFeedbackButton({ feedbackId }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteFeedback(feedbackId);
    mutate(
      ['/api/feedback', user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId
          )
        };
      },
      false
    );
    onClose();
    setIsOpen(false);
  };

  const cancelRef = useRef();

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        aria-label="Delete feedback"
        variant="outline"
        colorScheme="red"
        fontSize="20px"
        id="feedback-delete-button"
        icon={<DeleteIcon />}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                fontWeight="bold"
                colorScheme="red"
                onClick={onDelete}
                ml={3}
                id="confirm-feedback-delete"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
