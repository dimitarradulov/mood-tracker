import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly _client: SupabaseClient;

  constructor() {
    this._client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  get auth(): SupabaseAuthClient {
    return this._client.auth;
  }

  async getDocumentById<T>(tableName: string, id: string) {
    try {
      const { data, error } = await this._client
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(`Error fetching document: ${error.message}`);
      }

      return data as T;
    } catch (error) {
      throw new Error(
        `${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async insertDocument<T>(tableName: string, document: Partial<T>) {
    try {
      const { data, error } = await this._client
        .from(tableName)
        .insert(document)
        .select()
        .single();

      if (error) {
        throw new Error(`Error inserting document: ${error.message}`);
      }

      return data as T;
    } catch (error) {
      throw new Error(
        `${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
