import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  FormLabel,
  useDisclosure
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

export default function AddSiteModal({ id, children }) {
  const initialRef = React.useRef();
  const toast = useToast();
  const auth = useAuth();
  const { handleSubmit, register, reset, errors } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      settings: {
        icons: true,
        timestamp: true,
        ratings: false
      }
    };
    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: "You've successfully added a new site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({ sites: [...data.sites, { id, ...newSite }] }),
      false
    );
    onClose();
    reset();
  };

  return (
    <>
      <Button
        colorScheme="orange"
        variant="solid"
        fontWeight="bold"
        size="md"
        onClick={onOpen}
        id={id}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Site Name</FormLabel>
              <Input
                type="text"
                id="site-name"
                placeholder="My site"
                {...register('name', {
                  required: 'Required',
                  message: 'please enter a site'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input
                type="text"
                id="site-url"
                placeholder="https://website.com.au"
                {...register('url', {
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="orange" type="submit" id="submit-button">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
