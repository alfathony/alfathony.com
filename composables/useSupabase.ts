export const useSupabase = () => {
  const supabase = useNuxtApp().$supabase
  
  return {
    client: supabase,
    
    async getProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    
    async getJournal() {
      const { data, error } = await supabase
        .from('journal')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      return data
    },
    
    async getTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
      
      if (error) throw error
      return data
    },
    
    async submitContact(formData: { name: string; email: string; message: string }) {
      const { data, error } = await supabase
        .from('contacts')
        .insert([formData])
      
      if (error) throw error
      return data
    }
  }
}