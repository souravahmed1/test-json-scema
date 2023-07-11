import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';

interface FileObject {
  url: string;
  mime: string;
  size: number;
  original_file_name: string;
}

interface MultiFileUploadProps {
  id: string;
  formData: FileObject[];
  uiSchema: {
    'ui:field': string;
    'ui:options': {
      'allowedTypes': string[]
    }
  }
  onChange: (updatedData: FileObject[]) => void;
  allowedTypes?: string[];
}

export function FileUploadField(props: MultiFileUploadProps) {
  console.log("Props, allowed: ", props.uiSchema['ui:options'].allowedTypes);
  const theme = useMantineTheme();


  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(false)


  const handleFileUploads = (files: FileWithPath[]) => {
    console.log('accepted files', files)
  }
  return (
    <Dropzone
      onDrop={(files) => handleFileUploads(files)}
      onReject={(files) => console.log('rejected files', files)}
      accept={props.uiSchema['ui:options'].allowedTypes}
      loading={loading}
    //   {...props.dropZoneProps}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size="3.2rem"
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size="3.2rem"
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size="3.2rem" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}