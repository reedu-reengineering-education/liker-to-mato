// src/components/ui/icons.tsx
import {
  Loader2,
  LucideProps,
  CreditCard,
  Lock,
  LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  spinner: Loader2,
  stripe: CreditCard,
  paypal: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      className={props.className}
    >
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .632-.539h4.605c2.057 0 3.555.357 4.459 1.062.848.664 1.295 1.664 1.295 2.944 0 .753-.153 1.432-.459 2.014-.321.607-.744 1.12-1.276 1.518-.73.546-1.547.912-2.444 1.087-.815.159-1.876.238-3.164.238h-.971l-.924 9.294zm3.918-18.297H6.642l-2.867 15.698h4.352l.924-9.294h1.942c.734 0 1.363-.035 1.888-.106a6.858 6.858 0 0 0 1.474-.318c.493-.176.898-.394 1.215-.653.317-.26.575-.549.773-.87.198-.321.345-.666.44-1.035.095-.369.143-.743.143-1.122 0-.99-.295-1.734-.885-2.23-.59-.497-1.552-.77-2.915-.77z"
        fill="currentColor"
      />
    </svg>
  ),
  lock: Lock,
};
