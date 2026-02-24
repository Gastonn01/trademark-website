import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[MercadoPago Webhook] Received notification:", JSON.stringify(body, null, 2))

    if (body.type === "payment") {
      const paymentId = body.data?.id

      if (!paymentId) {
        console.log("[MercadoPago Webhook] No payment ID found")
        return NextResponse.json({ received: true })
      }

      // Get payment details from MercadoPago API
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      })

      const paymentData = await mpResponse.json()

      console.log("[MercadoPago Webhook] Payment status:", paymentData.status)
      console.log("[MercadoPago Webhook] Payment metadata:", paymentData.metadata)

      if (paymentData.status === "approved") {
        const metadata = paymentData.metadata || {}

        // Email to admin with full registration details
        await resend.emails.send({
          from: "Trakmar Registros <noreply@trakmar.com>",
          to: "trakmar@proton.me",
          subject: `✅ PAGO CONFIRMADO - ${metadata.trademark_name || "Nueva Marca"}`,
          html: `
            <h2>🎉 Pago Confirmado - Nueva Solicitud de Registro</h2>
            
            <h3>💳 Información del Pago</h3>
            <ul>
              <li><strong>ID de Pago:</strong> ${paymentId}</li>
              <li><strong>Monto:</strong> $${paymentData.transaction_amount?.toLocaleString()}</li>
              <li><strong>Método de pago:</strong> ${paymentData.payment_method_id}</li>
              <li><strong>Estado:</strong> ${paymentData.status}</li>
            </ul>

            <h3>🏷️ Información de la Marca</h3>
            <ul>
              <li><strong>Nombre de la marca:</strong> ${metadata.trademark_name || "N/A"}</li>
              <li><strong>Plan:</strong> ${metadata.plan || "N/A"}</li>
              <li><strong>Clases:</strong> ${metadata.classes || "N/A"}</li>
            </ul>

            <h3>👤 Datos del Cliente</h3>
            <ul>
              <li><strong>Email:</strong> ${paymentData.payer?.email || metadata.email || "N/A"}</li>
            </ul>

            <p><strong>⚠️ ACCIÓN REQUERIDA:</strong> Procesar el registro de marca para este cliente.</p>
          `,
        })

        // Email to client with promo code
        if (paymentData.payer?.email || metadata.email) {
          await resend.emails.send({
            from: "Trakmar Registros <noreply@trakmar.com>",
            to: paymentData.payer?.email || metadata.email,
            subject: "✅ Pago Confirmado - Tu Registro de Marca",
            html: `
              <h2>¡Gracias por tu pago!</h2>
              
              <p>Hemos recibido tu pago exitosamente. Comenzaremos a procesar tu solicitud de registro de marca de inmediato.</p>

              <h3>Resumen de tu solicitud:</h3>
              <ul>
                <li><strong>Marca:</strong> ${metadata.trademark_name || "Tu marca"}</li>
                <li><strong>Plan:</strong> ${metadata.plan || "N/A"}</li>
                <li><strong>Monto pagado:</strong> $${paymentData.transaction_amount?.toLocaleString()}</li>
              </ul>

              <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0;">🎁 Tu Código Promocional Exclusivo</h3>
                <p>Como agradecimiento, te regalamos un código de descuento del 15% para tu próximo registro de marca:</p>
                <div style="background: white; border: 2px dashed #0ea5e9; border-radius: 4px; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #0ea5e9; margin: 10px 0;">
                  trademarks26
                </div>
                <p style="margin-bottom: 0;"><small>Válido para futuros registros de marca. Ingresa este código en el paso final antes de pagar.</small></p>
              </div>

              <h3>Próximos pasos:</h3>
              <ol>
                <li>Revisaremos tu solicitud en las próximas 24-48 horas</li>
                <li>Te contactaremos si necesitamos información adicional</li>
                <li>Procederemos con el registro ante el INPI</li>
                <li>Recibirás actualizaciones por email durante todo el proceso</li>
              </ol>

              <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este email.</p>

              <p>Saludos,<br><strong>Equipo Trakmar</strong></p>
            `,
          })
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[MercadoPago Webhook] Error processing webhook:", error)
    return NextResponse.json({ received: true, error: String(error) })
  }
}
