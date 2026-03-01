import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, Clock, ChevronRight } from "lucide-react";
import { POLICIES } from "@/data/policies";

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const policy = POLICIES[slug as keyof typeof POLICIES];

    if (!policy) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Breadcrumbs / Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-10 group text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Policy Header Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                    <div className="bg-slate-900 px-8 py-10 md:px-12 md:py-14 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                                <FileText className="w-3.5 h-3.5" />
                                <span>Official Policy</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                {policy.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-8 text-slate-400">
                                {policy.effectiveDate && (
                                    <div className="flex items-center space-x-2 text-sm bg-white/5 px-3 py-1 rounded-md border border-white/10">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span>Effective: <span className="text-white font-medium">{policy.effectiveDate}</span></span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 text-sm bg-white/5 px-3 py-1 rounded-md border border-white/10">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span>Read time: <span className="text-white font-medium">~5 mins</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="px-8 py-12 md:px-12 md:py-16">
                        {policy.introduction && (
                            <div className="max-w-3xl mb-12">
                                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light italic border-l-4 border-blue-500 pl-6 py-2 bg-slate-50 rounded-r-lg">
                                    "{policy.introduction}"
                                </p>
                            </div>
                        )}

                        <div className="space-y-16">
                            {policy.sections.map((section, idx) => (
                                <section key={idx} className="group">
                                    {section.title && (
                                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors">
                                            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-xs flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all font-mono">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            {section.title}
                                        </h2>
                                    )}

                                    <div className="pl-12 space-y-6">
                                        {Array.isArray(section.content) ? (
                                            section.content.map((para, pIdx) => (
                                                <p key={pIdx} className="text-slate-600 leading-relaxed text-[17px]">
                                                    {para}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-slate-600 leading-relaxed text-[17px]">
                                                {section.content}
                                            </p>
                                        )}

                                        {section.items && (
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                {section.items.map((item, iIdx) => (
                                                    <li key={iIdx} className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group/item">
                                                        <ChevronRight className="w-5 h-5 text-blue-500 mr-3 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                                                        <span className="text-slate-700 text-[15px] font-medium leading-normal">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Bottom Contact / Info */}
                        <div className="mt-20 pt-12 border-t border-slate-200">
                            <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                                    <p className="text-blue-100 text-lg md:max-w-md">
                                        Our support team is here to help you understand our policies and services better.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                    <a
                                        href="mailto:support@myroed.com"
                                        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors text-center shadow-lg"
                                    >
                                        Email Support
                                    </a>
                                    <Link
                                        href="/#contact"
                                        className="bg-blue-700 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors text-center shadow-lg"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer info if any */}
                {policy.footerInfo && (
                    <p className="text-center text-slate-400 text-sm mt-8">
                        {policy.footerInfo}
                    </p>
                )}
            </div>
        </div>
    );
}
