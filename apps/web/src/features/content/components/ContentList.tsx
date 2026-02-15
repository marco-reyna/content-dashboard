import type { Content } from '@content-dashboard/shared';

interface Props {
  items: Content[];
}

export function ContentList({ items }: Props) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <small>
            {item.author} — {new Date(item.createdAt).toLocaleDateString()}
          </small>
        </li>
      ))}
    </ul>
  );
}
