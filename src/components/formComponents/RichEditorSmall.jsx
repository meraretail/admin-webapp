import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichEditorSmall = ({ value, setValue, placeholder }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setValue(data);
  };
  // Available functions: onReady, onBlur, onFocus

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleChange}
        config={{
          placeholder: placeholder,
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'bulletedList',
              'numberedList',
              '|',
              'undo',
              'redo',
            ],
            shouldNotGroupWhenFull: true,
          },
        }}
      />
    </div>
  );
};

export default RichEditorSmall;
