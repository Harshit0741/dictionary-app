# Dictionary App

A simple mobile dictionary app built using React Native. The app allows users to search for a word and view its definition and synonyms fetched from a public API.

## Setup & Run Instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/Harshit0741/dictionary-app.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Start the app:
   
      - Run the app on your emulator or device:
   ```bash
   npx expo start
   ```
5. To run tests:
   ```bash
   npm test
   ```

## Time Spent & Next Steps:

- **Time spent**: Approx. <3 hours working on the app, including setting up the environment, implementing the features, and testing.
- **Next steps**:
  - Add more unit/component tests, especially for edge cases (e.g., empty term input, network errors).
  - Improve the UI and user experience with animations and better styling.
  - Add offline support to the app.

 ## Test Suite:

 The tests are using Jest and React Native Testing Library for component and functionality testing. To run the tests:
   ```bash
   npm test
   ```
   or
   ```bash
   yarn test
   ```
   This will execute the test suite and show the results in your terminal.

## Example Tests:
   1. **Rendering Input and Button**: Ensures that the input field and submit button are rendered correctly.
   
   2. **Loading Indicator**: Verifies that the loading spinner is shown when the "Submit" button is pressed.
    
   3. **Error Handling**: Ensures that the appropriate error message is shown when no term is found or when there is a network issue.

These tests ensure that the app's core functionalities are working as expected.
  
