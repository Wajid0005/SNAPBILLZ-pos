import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewRequest {
  rating: number;
  positiveReview: string;
  problems: string;
  missingFeatures: string;
  timestamp: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, positiveReview, problems, missingFeatures, timestamp }: ReviewRequest = await req.json();

    console.log("Sending review email:", { rating, timestamp });

    const emailResponse = await resend.emails.send({
      from: "SnapBillz Reviews <onboarding@resend.dev>",
      to: ["005wajid@gmail.com"],
      subject: `New SnapBillz Review - ${rating} Stars ⭐`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">New SnapBillz Review</h1>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #495057; margin-top: 0;">Rating: ${'⭐'.repeat(rating)} (${rating}/5)</h2>
            <p style="color: #6c757d; margin: 5px 0;"><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>

          ${positiveReview ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #28a745;">❤️ What they love:</h3>
              <p style="background: #d4edda; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745;">
                ${positiveReview}
              </p>
            </div>
          ` : ''}

          ${problems ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #dc3545;">🔧 Problems to fix:</h3>
              <p style="background: #f8d7da; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545;">
                ${problems}
              </p>
            </div>
          ` : ''}

          ${missingFeatures ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #007bff;">💡 Feature requests:</h3>
              <p style="background: #d1ecf1; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                ${missingFeatures}
              </p>
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              This review was automatically sent from your SnapBillz app
            </p>
          </div>
        </div>
      `,
    });

    console.log("Review email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-review function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);