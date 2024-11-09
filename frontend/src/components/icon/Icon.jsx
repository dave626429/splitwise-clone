export default function Icon(props) {
  const { icon, classes, id } = props;

  return (
    <div
      id={id}
      className={`flex justify-center items-center w-[24px] aspect-square ${classes}`}
    >
      {icon}
    </div>
  );
}
