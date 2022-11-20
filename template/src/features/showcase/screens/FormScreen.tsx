import { Button, Field, KeyboardAwareScrollView, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { FormProvider } from 'react-hook-form';
import { useFormContainer } from '../containers';

const FormScreen = withHook(useFormContainer, ({ formMethods, checkboxData, onSubmit }) => {
  const styles = useStyle(createStyles);

  return (
    <StackContainer headerTitle={ProtectedScreenName.Form}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <FormProvider {...formMethods}>
          <Field.TextInput name="firstName" label="firstName" containerStyle={styles.field} />

          <Field.TextInput name="lastName" label="lastName" containerStyle={styles.field} />

          <Field.TextInput name="age" label="age" containerStyle={styles.field} />

          <Field.TextInput name="address" label="address" containerStyle={styles.field} />

          <Field.TextInput name="gender" label="gender" containerStyle={styles.field} />

          <Field.Checkboxes
            name="usingPhone"
            label="usingPhone"
            data={checkboxData}
            containerStyle={styles.field}
            itemStyle={globalStyles.flexFill}
          />
        </FormProvider>

        <Spacer h={32} />
        <Button title="Submit" onPress={onSubmit} />
      </KeyboardAwareScrollView>
    </StackContainer>
  );
});

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingHorizontal: 16,
    },
    field: {
      paddingVertical: 8,
    },
  });

export default FormScreen;
