import React from "react";
import FormTitle from "../Form/FormTitle";
import FormFilling from "../Form/FormFilling";
import generalComponents from "../GeneralComponents";
import useForms from "../../useForms";
import { FillingHandleContext } from "../../FillingHandleContext";

// CSS in JS
// general components
const { Container, Form, FormContent, Footer } = generalComponents();

// front render
function App() {
  const {
    handleSubmit,
    handleFormFocus,
    handleInputChange,
    messageError,
    filledInfo,
  } = useForms();
  return (
    <>
      <Container>
        <Form>
          <FormContent>
            <FormTitle />
            <FillingHandleContext.Provider
              value={{
                handleSubmit,
                handleInputChange,
                handleFormFocus,
                messageError,
                filledInfo,
              }}
            >
              <FormFilling />
            </FillingHandleContext.Provider>
          </FormContent>
        </Form>
      </Container>
      <Footer>© 2020 Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
