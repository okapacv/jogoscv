import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface AirtableRecord {
  id: string;
  fields: {
    Title: string;
    Description?: string;
    'Original Price'?: number;
    'Promotional Price'?: number;
    'Discount Percentage'?: number;
    'Cover Image'?: Array<{ url: string }>;
    Genre?: string;
    Developer?: string;
    Publisher?: string;
    Platform?: string;
    'Promotion Type'?: string;
    'Is Featured'?: boolean;
    'Purchase URL'?: string;
    'Release Date'?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const airtableApiKey = Deno.env.get('AIRTABLE_API_KEY');
    const airtableBaseId = Deno.env.get('AIRTABLE_BASE_ID');
    const airtableTableName = Deno.env.get('AIRTABLE_TABLE_NAME') || 'Games';

    if (!airtableApiKey || !airtableBaseId) {
      return new Response(
        JSON.stringify({
          error: 'Airtable API Key ou Base ID não configurados. Configure as variáveis de ambiente AIRTABLE_API_KEY e AIRTABLE_BASE_ID.',
          success: false,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
    const airtableResponse = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (!airtableResponse.ok) {
      throw new Error(`Erro ao buscar dados do Airtable: ${airtableResponse.statusText}`);
    }

    const airtableData = await airtableResponse.json();
    const records: AirtableRecord[] = airtableData.records || [];

    const { data: platforms } = await supabase.from('platforms').select('id, slug, name');

    const platformMap = new Map(
      (platforms || []).map((p) => [p.name.toLowerCase(), p.id])
    );

    let syncedCount = 0;
    let errors: string[] = [];

    for (const record of records) {
      try {
        const fields = record.fields;
        const platformName = fields.Platform?.toLowerCase() || 'pc';
        const platformId = platformMap.get(platformName) || platformMap.get('pc');

        const slug = fields.Title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const gameData = {
          title: fields.Title,
          slug,
          description: fields.Description || null,
          original_price: fields['Original Price'] || null,
          promotional_price: fields['Promotional Price'] || null,
          discount_percentage: fields['Discount Percentage'] || 0,
          cover_image_url: fields['Cover Image']?.[0]?.url || null,
          genre: fields.Genre || null,
          developer: fields.Developer || null,
          publisher: fields.Publisher || null,
          platform_id: platformId,
          promotion_type: fields['Promotion Type'] || 'discount',
          is_featured: fields['Is Featured'] || false,
          purchase_url: fields['Purchase URL'] || null,
          release_date: fields['Release Date'] || null,
          airtable_id: record.id,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from('games')
          .upsert(gameData, {
            onConflict: 'airtable_id',
          });

        if (error) {
          errors.push(`Erro ao sincronizar ${fields.Title}: ${error.message}`);
        } else {
          syncedCount++;
        }
      } catch (err) {
        errors.push(`Erro ao processar registro ${record.id}: ${err.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced: syncedCount,
        total: records.length,
        errors: errors.length > 0 ? errors : undefined,
        message: `Sincronizados ${syncedCount} de ${records.length} jogos do Airtable`,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
