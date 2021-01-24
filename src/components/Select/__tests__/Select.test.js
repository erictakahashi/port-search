import { shallow } from 'enzyme';

import Select from '../Select';
import Styled from '../Select.styled';

const props = {
  itemAttrLabel: 'name',
  itemAttrValue: 'code',
  items: [
    { code: 'A', name: 'Name A' },
    { code: 'B', name: 'Name B' }
  ],
  label: 'Label'
};

/**
 * Factory function that will create a `Select` shallow wrapper.
 * @param {object} customProps Custom props for the shallow component.
 */
const setup = (customProps = {}) => {
  const setupProps = { ...props, ...customProps };
  return shallow(<Select {...setupProps} />);
};

describe('Select', () => {
  it('should render a `form control` container', () => {
    const component = setup();
    const formControl = component.find(Styled.FormControl);
    expect(formControl.length).toBe(1);
  });

  it('should render a `label` component', () => {
    const component = setup();
    const label = component.find(Styled.Label);
    expect(label.length).toBe(1);
  });

  it('should render a `select` component', () => {
    const component = setup();
    const select = component.find(Styled.Select);
    expect(select.length).toBe(1);
  });

  it('should render `select items` components according to items prop', () => {
    const component = setup();
    const selectItems = component.find(Styled.SelectItem);
    expect(selectItems.length).toBe(props.items.length);
  });

  describe('label', () => {
    it('should have an `id` prop', () => {
      const component = setup();
      const label = component.find(Styled.Label);
      const idProp = label.prop('id');
      expect(idProp).toBeTruthy();
    });

    it('should have the same value for label `id` and select `labelId`', () => {
      const component = setup();

      const label = component.find(Styled.Label);
      const idProp = label.prop('id');

      const select = component.find(Styled.Select);
      const labelIdProp = select.prop('labelId');

      expect(idProp).toEqual(labelIdProp);
    });

    it('should set the component `label` prop as expected', () => {
      const component = setup();
      const label = component.find(Styled.Label);
      const labelText = label.text();
      expect(labelText).toBe(props.label);
    });
  });

  describe('select item', () => {
    const firstItem = props.items[0];

    it('should set the component `itemAttrLabel` prop as expect', () => {
      const component = setup();
      const selectItems = component.find(Styled.SelectItem).first();
      const childrenProp = selectItems.prop('children');
      expect(childrenProp).toBe(firstItem[props.itemAttrLabel]);
    });

    it('should set the component `itemAttrValue` prop as expect', () => {
      const component = setup();
      const selectItems = component.find(Styled.SelectItem).first();
      const valueProp = selectItems.prop('value');
      expect(valueProp).toBe(firstItem[props.itemAttrValue]);
    });
  });

  describe('onChange', () => {
    it('should set and call the component `onChange` prop as expect', () => {
      const customOnChange = jest.fn();

      const component = setup({ onChange: customOnChange });
      const select = component.find(Styled.Select);
      const onChangeProp = select.prop('onChange');

      const mockedEvent = { target: { value: 'test' } };
      onChangeProp(mockedEvent);

      expect(customOnChange).toHaveBeenCalled();
    });
  });
});
