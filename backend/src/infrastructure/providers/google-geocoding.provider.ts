import { Service } from 'typedi';

import { environment } from '@/config/environment';
import { LoggerService } from '@/shared/logger.service';

export interface GeocodingAddress {
  direccion: string;
  ciudad: string;
  provincia: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleGeocodingResponse {
  status: string;
  error_message?: string;
  results: GoogleGeocodingResult[];
}

interface GoogleGeocodingResult {
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
}

@Service()
export class GoogleGeocodingProvider {
  constructor(private readonly logger: LoggerService) {}

  public async geocodeAddress(
    address: GeocodingAddress,
  ): Promise<Coordinates | undefined> {
    if (!environment.googleMapsApiKey) {
      this.logger.warn(
        'GOOGLE_MAPS_API_KEY is not configured; property coordinates were not geocoded.',
      );
      return undefined;
    }

    const formattedAddress = this.formatAddress(address);
    if (!formattedAddress) {
      return undefined;
    }

    const params = new URLSearchParams({
      address: formattedAddress,
      key: environment.googleMapsApiKey,
      language: 'es',
      region: 'ar',
    });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
      );

      if (!response.ok) {
        this.logger.warn(
          `Google Geocoding request failed with status ${response.status}.`,
        );
        return undefined;
      }

      const data = (await response.json()) as GoogleGeocodingResponse;
      if (data.status !== 'OK') {
        const reason = data.error_message || data.status;
        this.logger.warn(`Google Geocoding did not resolve address: ${reason}`);
        return undefined;
      }

      const location = data.results[0]?.geometry?.location;
      if (
        typeof location?.lat !== 'number' ||
        typeof location.lng !== 'number'
      ) {
        this.logger.warn('Google Geocoding returned a result without lat/lng.');
        return undefined;
      }

      return {
        lat: location.lat,
        lng: location.lng,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Google Geocoding request failed: ${message}`);
      return undefined;
    }
  }

  private formatAddress(address: GeocodingAddress): string {
    return [address.direccion, address.ciudad, address.provincia, 'Argentina']
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .join(', ');
  }
}
