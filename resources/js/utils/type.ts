export type Items = {
    name: string;
    jaName: string;
};

export type Names = {
    name: string;
    jaName: string;
};

export type PokemonNamesAndText = {
    name: string;
    text?: string;
};

export type PokemonProperties = {
    id: number;
    thumbnail: string;
    image: string;
    name: string;
    text?: string;
    types: string[];
    abilities: string[];
    weight: number;
    height: number;
};

export type PokemonPropertiesWithCount = {
    id: number;
    thumbnail: string;
    image: string;
    name: string;
    text?: string;
    types: string[];
    abilities: string[];
    weight: number;
    height: number;
    count: number;
};

export type Pokemon = {
    name: string;
    url: string;
};

export type PokemonResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

export type CardProps = {
    pokemon: PokemonProperties;
};

export interface PokemonDetailsResponse {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: {
        front_default: string;
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    species: {
        url: string;
    };
    types: {
        type: {
            url: string;
            name: string;
        };
    }[];
    abilities: {
        ability: {
            url: string;
            name: string;
        };
    }[];
    flavor_text_entries?: {
        flavor_text: string;
        language: {
            name: string;
        };
    }[];
    names: {
        name: string;
        language: {
            name: string;
        };
    }[];
}

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Form {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}

export interface HeldItem {
    item: {
        name: string;
        url: string;
    };
    version_details: any[];
}

export interface Move {
    move: {
        name: string;
        url: string;
    };
    version_group_details: any[];
}

export interface Sprite {
    front_default: string;
    other: {
        "official-artwork": {
            front_default: string;
        };
    };
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface FavoritePokemonResponse {
    abilities: Ability[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: {
        name: string;
        url: string;
    };
    sprites: Sprite;
    stats: Stat[];
    types: Type[];
    weight: number;
}
