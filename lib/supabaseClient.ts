import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjnepvxvfxlevdncjwfl.supabase.co'; // Substitua pela URL do seu projeto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbmVwdnh2ZnhsZXZkbmNqd2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzU2MzEsImV4cCI6MjA2NjUxMTYzMX0.XmU68ru_sKPFYWJvysQEDTZE6GUuMwa9vdVJewqO0mM'; // Substitua pela anon public key do seu projeto

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 