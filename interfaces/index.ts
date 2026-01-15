export interface PropertyProps {
  id: number;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image?: string;
  discount?: string;
}

export interface ButtonProps {
  text: string;
  textSize?: string;
  bgColor?: string;
  border?: string;
  borderColor?: string;
  color: string;
  hover?: string;
  image?: string;
  onClick?: () => void;
}

export interface PropertyCardProps {
  id : number;
  property: PropertyProps;
}
