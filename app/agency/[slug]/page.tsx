import type {Metadata} from "next";import {notFound} from "next/navigation";import {AgencyProfile} from "@/components/site";import {getAgencies} from "@/lib/store";
export const dynamic="force-dynamic";
export async function generateStaticParams(){return (await getAgencies()).map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:{slug:string}}):Promise<Metadata>{const a=(await getAgencies()).find(x=>x.slug===params.slug);return a?{title:a.name+" | Agency in "+a.city,description:a.desc,alternates:{canonical:`/agency/${a.slug}`}}:{title:"Agency not found"}}
export default async function Profile({params}:{params:{slug:string}}){const agency=(await getAgencies()).find(a=>a.slug===params.slug);if(!agency)notFound();return <AgencyProfile agency={agency}/>}
