export interface Province {
    id: string;
    name: string;
}

export interface City {
    id: string;
    province_id: string;
    name: string;
}

export async function getProvinces(): Promise<Province[]> {
    const response = await fetch('/api/provinces');
    if (!response.ok || response.status !== 200) {
        throw new Error('Failed to fetch provinces');
    }

    const data = (await response.json()) as Province[];
    return data;
}

export async function getCities(provinceId: string): Promise<City[]> {
    const response = await fetch(`/api/provinces/${provinceId}/cities`);
    if (!response.ok || response.status !== 200) {
        throw new Error('Failed to fetch cities');
    }

    const data = (await response.json()) as City[];
    return data;
}
