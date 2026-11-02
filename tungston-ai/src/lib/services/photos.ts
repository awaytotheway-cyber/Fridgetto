/**
 * Unsplash photos used on the service pages (Unsplash License: free for commercial use).
 * Files are in public/assets/services; photographers are credited here and in ASSETS.md.
 * Pages share photos where their audiences overlap.
 */
import type { Photo } from "./types";

const by = (name: string, username: string) => ({ name, url: `https://unsplash.com/@${username}` });

const photo = (file: string, alt: string, credit: Photo["credit"]): Photo => ({
  src: `/assets/services/${file}.webp`,
  alt,
  credit,
});

export const photos = {
  accountsDesk: photo("accounts-desk", "A person working through figures on a calculator at a desk", by("Towfiqu barbhuiya", "towfiqu999999")),
  cafeOwner: photo("cafe-owner", "A smiling café owner standing at her counter", by("Vitaly Gariev", "silverkblack")),
  calculatorLaptop: photo("calculator-laptop", "A calculator and printed reports next to a laptop", by("Jakub Żerdzicki", "jakubzerdzicki")),
  callCentre: photo("call-centre", "A team of support agents with headsets, smiling at their desks", by("LumenSoft Technologies", "candelarms")),
  clinicReception: photo("clinic-reception", "A bright, modern clinic consulting room", by("Irshad Pathan", "alrighthospital")),
  creatorDesk: photo("creator-desk", "A creator recording a video at her desk with a microphone and laptop", by("Videodeck", "videodeck")),
  deskLaptop: photo("desk-laptop", "A business owner working on a laptop in an office", by("Mina Rad", "miinrad")),
  founderLaptop: photo("founder-laptop", "A founder in a maroon sweater at his laptop", by("Saad Manzoor", "saadi1191")),
  headsetDesk: photo("headset-desk", "A headset resting beside a laptop on a desk", by("Petr Macháček", "machec")),
  laptopsTeam: photo("laptops-team", "A large team meeting around a long table with laptops", by("Christina @ wocintechchat.com", "wocintechchat")),
  ownerLaptop: photo("owner-laptop", "A business owner typing at a laptop in a quiet office", by("Mina Rad", "miinrad")),
  paperworkReview: photo("paperwork-review", "Hands sorting tax forms with a phone calculator", by("Kelly Sikkema", "kellysikkema")),
  phoneShopping: photo("phone-shopping", "A shopper browsing a sale on a smartphone", by("CardMapr.nl", "cardmapr")),
  salesMeeting: photo("sales-meeting", "Colleagues in a glass-walled meeting room", by("Rodeo", "getrodeo")),
  shopOwner: photo("shop-owner", "A shop owner arranging products behind her counter", by("Ellicia", "ellicia_")),
  siteSupervisor: photo("site-supervisor", "A supervisor in a hard hat checking paperwork between warehouse shelves", by("Ali Mkumbwa", "mkumbwajr")),
  supportAgent: photo("support-agent", "Customer support agents with headsets at their computers", by("BaljkanN4", "baljkann4")),
  taxPaperwork: photo("tax-paperwork", "Tax paperwork, a phone and a pen laid out on a desk", by("Kelly Sikkema", "kellysikkema")),
  teamMeeting: photo("team-meeting", "A team meeting around tables in a busy office", by("Redd Francisco", "reddfrancisco")),
  teamPlanning: photo("team-planning", "A team taking notes together around a table", by("Dylan Gillis", "mainermedia")),
  videoCall: photo("video-call", "An office worker smiling on a video call at his laptop", by("Vitaly Gariev", "silverkblack")),
  videoCreator: photo("video-creator", "A videographer filming with a camera under red light", by("Kyle Loftus", "kyleloftusstudios")),
  warehouseBoxes: photo("warehouse-boxes", "Warehouse staff in orange shirts packing boxes for dispatch", by("Reproductive Health Supplies Coalition", "rhsupplies")),
} satisfies Record<string, Photo>;
