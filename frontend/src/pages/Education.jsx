import React from 'react';
import { BookOpen, Users, Heart, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Education = () => {
    return (
        <div className="pt-20 pb-20 container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-ngo-dark mb-4">Education Initiatives</h1>
                <p className="text-xl text-gray-600">Empowering the future through knowledge.</p>
            </div>

            {/* Original Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
                {/* EduFutureIndia */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600"><BookOpen size={24} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">EduFutureIndia</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                        An authenticated platform connecting sponsors with needy students. Applications are verified directly by our volunteers before enrollment to ensure genuine support reaches those who need it most.
                    </p>
                </div>

                {/* I Support A Girl (ISAG) */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 border-t-4 border-t-pink-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-pink-100 p-3 rounded-full text-pink-600"><Heart size={24} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">I Support A Girl (ISAG)</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                        Supports underprivileged girls with HIV-positive parents. In collaboration with “CHILD” NGO, we offer education, mentoring, and career coaching to 100+ girls, ensuring they build a secure future.
                    </p>
                </div>

                {/* GramaRajyam */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 border-t-4 border-t-green-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-600"><Users size={24} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">GramaRajyam</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                        Conducted annually on Oct 2nd (Gandhi Jayanthi). Focuses on hygiene, health, and cleanliness awareness in rural schools and communities, instilling values of civic responsibility.
                    </p>
                </div>

                {/* Scholarships */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 border-t-4 border-t-purple-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600"><GraduationCap size={24} /></div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Scholarships</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                        We provide financial aid for deserving students who demonstrate academic potential but lack resources.
                    </p>
                    <Link to="/scholarship" className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition w-full md:w-auto text-center shadow-md">
                        Apply for Scholarship
                    </Link>
                </div>
            </div>

            {/* Key Projects Section (Detailed) */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center text-ngo-green mb-12 font-display">Our Key Projects</h2>
                <div className="space-y-12">
                     {/* Project ISAG */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 md:flex hover:shadow-2xl transition duration-300">
                        <div className="md:w-1/3 bg-pink-50 p-10 flex flex-col justify-center items-center text-center">
                            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-6 shadow-sm">
                                <Heart size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 font-display">Project ISAG</h3>
                            <span className="text-sm font-bold tracking-wider text-pink-500 uppercase mt-2">I Support A Girl</span>
                        </div>
                        <div className="md:w-2/3 p-10 flex flex-col justify-center">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We choose to bring the spotlight to the underprivileged kids who are lineage of HIV positive parents under the banner 
                                <span className="font-semibold text-gray-800"> EduFuture India</span>. 
                                With the ardent support of its donors, we adopted the education of 100 girls who are the wards of HIV affected parents.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                <span className="font-semibold text-pink-600">ISAG</span> – collaborated with <span className="font-semibold">CHILD</span> an NGO in their project of "I Support A Girl", supports the education of underprivileged girl children. Continues mentoring and career coaching to all the Girls under the "I Support A Girl" project.
                            </p>
                        </div>
                    </div>

                    {/* GramaRajyam */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 md:flex hover:shadow-2xl transition duration-300">
                         <div className="md:w-1/3 bg-green-50 p-10 flex flex-col justify-center items-center text-center order-first md:order-last">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                                <Users size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 font-display">GramaRajyam</h3>
                            <span className="text-sm font-bold tracking-wider text-green-600 uppercase mt-2">Village Empowerment</span>
                        </div>
                        <div className="md:w-2/3 p-10 flex flex-col justify-center">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Since 2017, <span className="font-semibold text-green-700">“Grama Rajjiyam”</span> is organised on Oct 2nd, Gandhi Jayanthi at different Government schools in and around Chennai.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                The initiative encourages the talents of the students and engages them in awareness campaigns on <span className="font-semibold text-gray-800">Health, Personal Hygiene, and Social Cleanliness</span>, fostering a sense of civic duty and community wellness from a young age.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
