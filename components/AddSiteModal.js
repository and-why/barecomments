import React from 'react';
import { useForm } from 'react-hook-form';
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

export default function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => createSite(values);
  const toast = useToast();

  return (
    <>
      <Button variant="solid" fontWeight="bold" size="md" onClick={onOpen}>
        Add your first site
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Site Name</FormLabel>
              <Input
                type="text"
                placeholder="My site"
                {...register('site', {
                  required: 'Required',
                  message: 'please enter a site'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input
                type="text"
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
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
