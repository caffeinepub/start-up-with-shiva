import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8744688860",
    href: "tel:+918744688860",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "styhurf@gmail.com",
    href: "mailto:styhurf@gmail.com",
    color: "text-golden-dark",
    bg: "bg-golden/15",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Balapur, Hyderabad, Telangana",
    href: "https://maps.google.com/?q=Balapur,+Hyderabad,+Telangana",
    color: "text-veggreen",
    bg: "bg-veggreen/10",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sun: 10:00 AM – 10:00 PM",
    href: null,
    color: "text-terracotta",
    bg: "bg-terracotta/10",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[0-9+\s\-]{7,15}$/.test(form.phone.trim()))
      errs.phone = "Please enter a valid phone number.";
    if (!form.message.trim()) errs.message = "Message cannot be empty.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section className="py-20 md:py-28 bg-cream-dark" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-terracotta font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Get in Touch
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-semibold text-foreground mb-4">
            Visit Us
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            We'd love to have you over. Walk in anytime or drop us a line — our
            doors are always open.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px w-12 bg-border" />
            <div className="w-2 h-2 rounded-full bg-golden" />
            <div className="h-px w-12 bg-border" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Contact Details
            </h3>

            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-xs"
              >
                <div className={`${detail.bg} p-2.5 rounded-lg shrink-0`}>
                  <detail.icon size={20} className={detail.color} />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      target={
                        detail.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noreferrer"
                      className="font-body font-medium text-foreground hover:text-terracotta transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="font-body font-medium text-foreground">
                      {detail.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Decorative element */}
            <div className="mt-8 p-6 rounded-2xl bg-terracotta text-white">
              <p className="font-display text-xl font-semibold mb-2">
                "Come hungry, leave happy."
              </p>
              <p className="font-body text-white/80 text-sm">
                Every table at Purely feels like a family gathering. We promise
                you a meal that warms the heart.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Send us a Message
              </h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-veggreen/10 flex items-center justify-center mb-4">
                      <CheckCircle size={36} className="text-veggreen" />
                    </div>
                    <h4 className="font-display text-2xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h4>
                    <p className="font-body text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you very
                      soon!
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full font-body border-terracotta text-terracotta hover:bg-terracotta/10"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="font-body font-medium text-foreground"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name.input"
                        type="text"
                        placeholder="e.g. Priya Sharma"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        className={`font-body rounded-xl h-11 ${errors.name ? "border-destructive focus-visible:ring-destructive" : "border-input"}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="text-destructive text-xs font-body mt-1"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-phone"
                        className="font-body font-medium text-foreground"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        data-ocid="contact.phone.input"
                        type="tel"
                        placeholder="e.g. 98765 43210"
                        value={form.phone}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }));
                          if (errors.phone)
                            setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        className={`font-body rounded-xl h-11 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : "border-input"}`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "contact-phone-error" : undefined
                        }
                      />
                      {errors.phone && (
                        <p
                          id="contact-phone-error"
                          className="text-destructive text-xs font-body mt-1"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="font-body font-medium text-foreground"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="contact-message"
                        data-ocid="contact.message.textarea"
                        placeholder="Write your message, reservation request, or inquiry..."
                        rows={4}
                        value={form.message}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }));
                          if (errors.message)
                            setErrors((prev) => ({ ...prev, message: "" }));
                        }}
                        className={`font-body rounded-xl resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : "border-input"}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "contact-message-error" : undefined
                        }
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          className="text-destructive text-xs font-body mt-1"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={submitting}
                      className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-body font-semibold rounded-full h-11 transition-all"
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            data-ocid="contact.loading_state"
                            size={16}
                            className="animate-spin mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
