import styled from 'styled-components';
import MaterialInputLabel from '@material-ui/core/InputLabel';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import MaterialFormControl from '@material-ui/core/FormControl';
import MaterialSelect from '@material-ui/core/Select';

const FormControl = styled(MaterialFormControl)`
  && {
    min-width: 200px;
  }
`;

const Label = styled(MaterialInputLabel)``;

const Select = styled(MaterialSelect)``;

const SelectItem = styled(MaterialMenuItem)``;

const Styled = {
  FormControl,
  Label,
  Select,
  SelectItem
};

export default Styled;
