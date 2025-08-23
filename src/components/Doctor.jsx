import React, { useState, useMemo } from "react";
import { Card, CardBody } from "./Card";
import {
  Search,
  Phone,
  MapPin,
  Star,
  Filter,
  Heart,
  Brain,
  Users,
} from "lucide-react";

const Doctor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock data for doctors - replace with actual API data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Clinical Psychologist",
      hospital: "Mind Wellness Center",
      phone: "+1 (555) 123-4567",
      address: "123 Therapy Lane, Mental Health District, City 12345",
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      experience: "12 years",
      patients: 450,
      specialties: ["Anxiety", "Depression", "PTSD"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Psychiatrist",
      hospital: "Serenity Medical Institute",
      phone: "+1 (555) 234-5678",
      address: "456 Healing Road, Wellness Quarter, City 12346",
      photo:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      experience: "15 years",
      patients: 680,
      specialties: [
        "Bipolar Disorder",
        "Schizophrenia",
        "Medication Management",
      ],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Therapist",
      hospital: "Hope & Healing Clinic",
      phone: "+1 (555) 345-6789",
      address: "789 Recovery Street, Mental Health Hub, City 12347",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      experience: "8 years",
      patients: 320,
      specialties: ["Couples Therapy", "Family Counseling", "Trauma"],
    },
    {
      id: 4,
      name: "Dr. Ananya Singh",
      specialty: "Neuropsychologist",
      hospital: "Neuro Care India",
      phone: "+91 98200 12345",
      address: "B-2, Apollo Road, Bandra West, Mumbai, Maharashtra 400050",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      experience: "20 years",
      patients: 520,
      specialties: ["Memory Disorders", "Cognitive Assessment", "Brain Injury"],
    },
    {
      id: 5,
      name: "Dr. Aditya Sharma",
      specialty: "Child Psychologist",
      hospital: "Mindful Kids Clinic",
      phone: "+91 98200 54321",
      address: "10, HSR Layout, Sector 6, Bangalore, Karnataka 560102",
      photo:
        "https://plus.unsplash.com/premium_photo-1691030256091-8d3733f8b6d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.8,
      experience: "10 years",
      patients: 380,
      specialties: ["ADHD", "Autism Spectrum", "Behavioral Issues"],
    },
    {
      id: 6,
      name: "Dr. Priya Desai",
      specialty: "Addiction Counselor",
      hospital: "Hope & Wellness Institute",
      phone: "+91 98200 98765",
      address: "5, Green Park, Parel, Mumbai, Maharashtra 400012",
      photo:
        "https://images.unsplash.com/photo-1646979201277-aca83fa543c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.6,
      experience: "14 years",
      patients: 290,
      specialties: ["Substance Abuse", "Behavioral Addiction", "Group Therapy"],
    },
  ];

  const specialties = [
    "all",
    "Clinical Psychologist",
    "Psychiatrist",
    "Therapist",
    "Neuropsychologist",
    "Child Psychologist",
    "Addiction Counselor",
  ];

  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSpecialty, sortBy]);

  const getSpecialtyIcon = (specialty) => {
    switch (specialty) {
      case "Clinical Psychologist":
      case "Therapist":
        return <Heart className="w-5 h-5 text-pink-500" />;
      case "Psychiatrist":
      case "Neuropsychologist":
        return <Brain className="w-5 h-5 text-purple-500" />;
      case "Child Psychologist":
        return <Users className="w-5 h-5 text-blue-500" />;
      default:
        return <Heart className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="absolute h-[100vh] w-[96vw] rr tt11 rrCenter flex flex-col justify-start items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header Section */}
        <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Find Your Mental Health Professional
            </h1>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Connect with experienced doctors and therapists who care about
              your mental well-being
            </p>
          </div>

          {/* Search and Filter Section */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1 w-full lg:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search doctors, hospitals, or specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                {/* Specialty Filter */}
                <div className="flex items-center gap-2 w-full lg:w-auto">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-w-[200px]"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty === "all" ? "All Specialties" : specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-w-[150px]"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                </select>
              </div>
            </CardBody>
          </Card>

          {/* Results Count */}
          <div className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Found {filteredDoctors.length} mental health professional
            {filteredDoctors.length !== 1 ? "s" : ""}
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:scale-105 transition-all duration-300 cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl"
              >
                <CardBody className="p-6">
                  {/* Doctor Photo and Basic Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            doctor.name
                          )}&size=64&background=6366f1&color=ffffff`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        {getSpecialtyIcon(doctor.specialty)}
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {doctor.specialty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {doctor.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({doctor.patients} patients)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hospital Info */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {doctor.hospital}
                    </h4>
                    <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight">{doctor.address}</span>
                    </div>
                  </div>

                  {/* Specialties Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Contact */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Experience:{" "}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {doctor.experience}
                      </span>
                    </div>
                    <a
                      href={`tel:${doctor.phone}`}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">Call Now</span>
                    </a>
                  </div>

                  {/* Phone Number */}
                  <div className="mt-2 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {doctor.phone}
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No doctors found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;