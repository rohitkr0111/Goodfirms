import type {Metadata} from "next";import {notFound} from "next/navigation";import {DirectoryPage} from "@/components/site";import {services} from "@/lib/data";import {getAgencies} from "@/lib/store";
export const dynamic="force-dynamic";
const slug=(s:string)=>s.toLowerCase().replaceAll(" ","-");export function generateStaticParams(){return services.map(service=>({service:slug(service)}))}
export function generateMetadata({params}:{params:{service:string}}):Metadata{const service=services.find(s=>slug(s)===params.service);return service?{title:`${service} Agencies | Goodfirms`,description:`Find and compare global ${service} agencies by location, rating, and budget.`,alternates:{canonical:`/services/${params.service}`}}:{title:"Service not found"}}
export default async function ServicePage({params}:{params:{service:string}}){const service=services.find(s=>slug(s)===params.service);if(!service)notFound();return <DirectoryPage service={service} listings={await getAgencies()}/>}
