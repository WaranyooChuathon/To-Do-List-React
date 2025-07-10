type CheckboxProps = {
  text: string;
  isChecked: boolean;
};

export default function Checkbox({ text, isChecked }: CheckboxProps) {
  let ResultCheckbox;

  if (isChecked) {
    ResultCheckbox = <div>{text} is done</div>;
  } else {
    ResultCheckbox = <div>{text} in progress</div>;
  }

  return <>{ResultCheckbox}</>;
}
