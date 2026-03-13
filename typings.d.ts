import type { Image } from "sanity";

export interface Category {
  _id: string;
  title?: string;
  name?: string;
  description?: string;
  coverImage: string;
  slug: string;
}

export interface Photo {
  _id: string;
  title: string;
  story?: string;
  description?: string;
  location?: string;
  place?: string;
  dateTaken?: string;
  image: string;
  imageUrl: string;
  url?: string;
  isFeatured?: boolean;
  slug: string;
  gallery?: Image[];
  category?: Category;
  isFeatured?: boolean;
}

export interface Video {
  _id: string;
  title: string;
  story?: string;
  videoUrl?: string;

  // file asset reference returned by the Sanity query
  videoFile?: {
    asset: {
      _id: string;
      url: string;
    };
  };

  // preview image asset
  previewImage?: {
    asset: {
      _id: string;
      url: string;
    };
  };

  // helper field returned by queries when we project the url directly
  previewImageUrl?: string;

  category?: Category;
}

// contact documents are structurally identical to the "about" type
export interface Contact {
  _id: string;
  _type?: "contact";

  name?: string;
  bio?: string;

  avatar?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  avatarUrl?: string;

  coverImage?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  coverImageUrl?: string;

  logo?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  logoUrl?: string;

  achievements?: {
    title?: string;
    year?: string;
    description?: string;
  }[];

  articles?: {
    title?: string;
    link?: string;
    publication?: string;
  }[];

  books?: {
    title?: string;
    link?: string;
    year?: string;
  }[];

  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface About {
  _id: string;
  _type: "about";

  name?: string;
  bio?: string;

  avatar?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  avatarUrl?: string;

  coverImage?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  coverImageUrl?: string;

  logo?: {
    _type?: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  logoUrl?: string;

  achievements?: {
    title?: string;
    year?: string;
    description?: string;
  }[];

  articles?: {
    title?: string;
    link?: string;
    publication?: string;
  }[];

  books?: {
    title?: string;
    link?: string;
    year?: string;
  }[];

  socialLinks?: {
    platform: string;
    url: string;
  }[];
}
