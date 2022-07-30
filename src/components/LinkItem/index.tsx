interface ILinkItemProps {
  link: string;
  name: string;
}

export default function LinkItem({ link, name }: ILinkItemProps) {
  return (
    <a
      href={link}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {name}
    </a>
  );
}
