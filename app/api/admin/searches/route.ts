import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const fetchCache = 'force-no-store'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { data: searches, error } = await supabase
      .from('free_searches')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching searches:', error)
      return NextResponse.json({ error: 'Failed to fetch searches' }, { status: 500 })
    }

    return NextResponse.json({ searches })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
