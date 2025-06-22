export interface ButtonNavProps {
  name: string;
  icon: string;
  link: string;
}

const ButtonNav = ({ name, icon, link }: ButtonNavProps) => {
  return (
    <>
      <i className={icon}></i>
      <a href={link}>{name}</a>
    </>
  );
};

export default ButtonNav;