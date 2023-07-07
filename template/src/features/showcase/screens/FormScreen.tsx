import { Button, Field, KeyboardAwareScrollView, Spacer } from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { FormProvider } from 'react-hook-form';
import { useFormContainer } from '../containers';

const FormScreen = withHook(
  useFormContainer,
  ({ form, checkboxData, onSubmit, formNames, formLabels }) => {
    const styles = useStyle(createStyles);

    return (
      <StackContainer title={ProtectedScreenName.Form}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <FormProvider {...form}>
            <Field.TextInput
              name={formNames.firstName}
              label={formLabels.firstName}
              containerStyle={styles.field}
            />

            <Field.TextInput
              name={formNames.lastName}
              label={formLabels.lastName}
              containerStyle={styles.field}
            />

            <Field.TextInput
              name={formNames.age}
              label={formLabels.age}
              containerStyle={styles.field}
            />

            <Field.TextInput
              name={formNames.address}
              label={formLabels.address}
              containerStyle={styles.field}
            />

            <Field.TextInput
              name={formNames.gender}
              label={formLabels.gender}
              containerStyle={styles.field}
            />

            <Field.Checkboxes
              name={formNames.phones}
              label={formLabels.phones}
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
  },
);

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
