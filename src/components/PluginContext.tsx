import { usePluginContext } from "@cortexapps/plugin-core/components";
import type React from "react";
import {
  useMemo,
} from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Code,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";

import useEntityCustomEvents from "../hooks/useEntityCustomEvents";
import useEntityCustomData, { customDataListToDict } from "../hooks/useEntityCustomData";
import useEntityDescriptor from "../hooks/useEntityDescriptor";

const PluginContext: React.FC = () => {
  const context = usePluginContext();
  const entityTag = context?.entity?.tag || "";

  const { entity, isLoading: isEntityLoading, error: entityError } = useEntityDescriptor({ entityTag });
  const { customData, isLoading: isCustomDataLoading, error: customDataError } = useEntityCustomData({ entityTag });
  const customDataDict = useMemo(() => customDataListToDict(customData), [customData]);
  const { customEvents, isLoading, error: customEventsError } = useEntityCustomEvents({ entityTag });

  if (isLoading || isCustomDataLoading || isEntityLoading) {
    return (
      <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
    );
  }

  return (
    <>
      <Heading as='h1' size='lg' mb={4}>
        Hooks Demo
      </Heading>
      <Accordion allowToggle allowMultiple>
        {context && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Entity Context JSON
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <pre>{JSON.stringify(context, null, 2)}</pre>
            </AccordionPanel>
          </AccordionItem>
        )}
        {entity && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Entity Descriptor JSON
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <pre>{JSON.stringify(entity, null, 2)}</pre>
            </AccordionPanel>
          </AccordionItem>
        )}
        {customEvents && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Custom Events JSON
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <pre>{JSON.stringify(customEvents, null, 2)}</pre>
            </AccordionPanel>
          </AccordionItem>
        )}
        {customData && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Custom Data JSON
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <pre>{JSON.stringify(customData, null, 2)}</pre>
            </AccordionPanel>
          </AccordionItem>
        )}
        {customDataDict && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Custom Data as Dictionary JSON
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <pre>{JSON.stringify(customDataDict, null, 2)}</pre>
            </AccordionPanel>
          </AccordionItem>
        )}
        {(customEventsError || customDataError || entityError) && (
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Errors
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {entityError && (
                <>
                  <Heading as='h2' size='md'>
                    Entity Descriptor Error:
                  </Heading>
                  <Code mb={4}>
                    {entityError?.message}
                  </Code>
                </>
              )}
              {customDataError && (
                <>
                  <Heading as='h2' size='md'>
                    Custom Data Error:
                  </Heading>
                  <Code mb={4}>
                    {customDataError?.message}
                  </Code>
                </>
              )}
              {customEventsError && (
                <>
                  <Heading as='h2' size='md'>
                    Custom Events Error:
                  </Heading>
                  <Code mb={4}>
                    {customEventsError?.message}
                  </Code>
                </>
              )}
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
};

export default PluginContext;
