import nextId from 'react-id-generator';
import PropTypes from 'prop-types';

import Styled from './Select.styled';

/**
 * Select component.
 */
const Select = (props) => {
  const {
    itemAttrLabel,
    itemAttrValue,
    items,
    label,
    onChange,
    selectedValue
  } = props;

  const compId = nextId();

  const handleChange = (e) => {
    if (!!onChange) onChange(e);
  };

  return (
    <Styled.FormControl>
      <Styled.Label id={compId}>{label}</Styled.Label>

      <Styled.Select
        value={selectedValue}
        labelId={compId}
        onChange={handleChange}
      >
        {!!items && !!items.length && items.map(item => (
          <Styled.SelectItem
            key={`${item[itemAttrValue]}`}
            value={item[itemAttrValue]}>
            {item[itemAttrLabel]}
          </Styled.SelectItem>
        ))}
      </Styled.Select>
    </Styled.FormControl>
  );
};

Select.propTypes = {
  /** 
   * The attribute from a single item of the `items` array
   * that will be used as `SelectItem` label (text to be displayed).
   */
  itemAttrLabel: PropTypes.string,
  /** 
   * The attribute from a single item of the `items` array
   * that will be used as `SelectItem` value prop.
   */
  itemAttrValue: PropTypes.string,
  /** Array of select items. */
  items: PropTypes.array,
  /** Select field label. */
  label: PropTypes.string,
  /** Component select `onChange`. */
  onChange: PropTypes.func,
  /** The selected value to be displayed in the select component. */
  selectedValue: PropTypes.string
};

export default Select;
