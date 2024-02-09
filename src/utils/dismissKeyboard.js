import TextInputState from 'react-native/Libraries/Components/TextInput/TextInputState';

export default function dismissKeyboard() {
  TextInputState.blurTextInput(TextInputState.currentlyFocusedInput());
}
