import { type SchemaTypeDefinition } from 'sanity';
import { siteSettings } from './siteSettings';
import { service } from './service';
import { shipmentVideo } from './shipmentVideo';
import { adScripts } from './adScripts';

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  service,
  shipmentVideo,
  adScripts,
];
