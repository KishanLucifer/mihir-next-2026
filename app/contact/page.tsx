import { getContact } from "@/lib/sanity.actions";
import ContactPageComponent from "./Contact";
import type { Contact } from "@/typings";

export const revalidate = 60;

export default async function ContactPage() {
  const contact: Contact[] = await getContact();

  return <ContactPageComponent contact={contact} />;
}
