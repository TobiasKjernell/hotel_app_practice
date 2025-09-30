
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://flezvkymtkxraubhyqsh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsZXp2a3ltdGt4cmF1Ymh5cXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTU0MjAsImV4cCI6MjA3MTYzMTQyMH0.8wD8lad9Vgh3_FmZfB_oYl6-23XlkXsDvlawcpf_-I4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;    