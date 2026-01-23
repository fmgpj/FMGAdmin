type Link = {
    label: string;
    href: string;
}

type MainLink = {
    label: string;
    href: string;
    subNav: Link[];
}

export type NavProps = {
    label: string;
    links: MainLink[];
}