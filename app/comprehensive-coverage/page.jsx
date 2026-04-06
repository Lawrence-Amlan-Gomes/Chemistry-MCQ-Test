"use client";
import { Atom, Beaker, BookOpen, FlaskConical } from "lucide-react";
import { useState } from "react";

const notes = [
  {
    topicNumber: 1,
    title: "Inorganic Chemistry",
    subTitle:
      "This branch deals with the properties and behavior of inorganic compounds, covering all elements in the periodic table.",
    bullets: [
      {
        heading: "Periodic Table & Classification",
        subHeading:
          "Modern Periodic Law, arrangement of elements into groups and periods, and periodic trends such as Atomic size, Ionization Potential, and Electronegativity.",
      },
      {
        heading: "Chemical Bonding",
        subHeading:
          "How atoms combine to form molecules via Ionic (electrovalent) bonding, Covalent bonding, Metallic bonding, and Hydrogen bonding.",
      },
      {
        heading: "Coordination Compounds",
        subHeading:
          "Understanding complex salts, ligands, coordination numbers, and standardized nomenclature of coordination entities.",
      },
      {
        heading: "Metallurgy",
        subHeading:
          "The scientific and technological process for isolating metals from ores, including concentration, roasting, calcination, and refining.",
      },
    ],
  },
  {
    topicNumber: 2,
    title: "Physical Chemistry",
    subTitle:
      "Physical chemistry focuses on the underlying physical principles that govern the behavior of chemical systems.",
    bullets: [
      {
        heading: "Atomic Structure",
        subHeading:
          "Concepts of atom, discovery of subatomic particles (electrons, protons, neutrons), Bohr's atomic model, isotopes, isobars, and distribution of electrons in shells.",
      },
      {
        heading: "States of Matter",
        subHeading:
          "Characteristics of solids, liquids, and gases; study of gas laws (Boyle's, Charles's), Ideal Gas Equation, and kinetic theory.",
      },
      {
        heading: "Chemical Thermodynamics",
        subHeading:
          "Study of heat and energy transformation, internal energy, Enthalpy, Entropy, and Laws of Thermodynamics.",
      },
      {
        heading: "Chemical Kinetics",
        subHeading:
          "The study of reaction rates and factors influencing speed, such as concentration, temperature, pressure, and catalysts.",
      },
      {
        heading: "Electrochemistry",
        subHeading:
          "The relationship between electricity and chemical change, including Redox reactions, Electrolysis, and Faraday's Laws.",
      },
      {
        heading: "Solutions & Colligative Properties",
        subHeading:
          "Types of solutions, solubility, and properties depending on solute particle count like Osmotic Pressure and Boiling Point Elevation.",
      },
    ],
  },
  {
    topicNumber: 3,
    title: "Organic Chemistry",
    subTitle:
      "Organic chemistry is the study of carbon-containing compounds, which are fundamental to life and industry.",
    bullets: [
      {
        heading: "Hydrocarbons",
        subHeading:
          "Classification into Alkanes, Alkenes, and Alkynes; study of their nomenclature, preparation, and chemical properties.",
      },
      {
        heading: "Functional Groups",
        subHeading:
          "Detailed study of Alcohols, Phenols, Ethers, Aldehydes, Ketones, Carboxylic Acids, and Amines.",
      },
      {
        heading: "Reaction Mechanisms",
        subHeading:
          "The step-by-step sequence of elementary reactions, including the roles of electrophiles and nucleophiles.",
      },
      {
        heading: "Biomolecules",
        subHeading:
          "The chemistry of biological systems including Carbohydrates, Proteins, Nucleic Acids (DNA/RNA), and Enzymes.",
      },
      {
        heading: "Polymers",
        subHeading:
          "Large molecules formed by repeating units; study of natural rubber and synthetic plastics like Nylon and Bakelite.",
      },
    ],
  },
];

export default function ComprehensiveCoverage() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Comprehensive Coverage
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            SSC Chemistry Complete Syllabus Coverage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master all three branches of chemistry with our comprehensive study
            materials. Each topic is broken down into key concepts for
            systematic learning.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {notes.map((topic) => (
            <div
              key={topic.topicNumber}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() =>
                setSelectedTopic(
                  selectedTopic === topic.topicNumber
                    ? null
                    : topic.topicNumber,
                )
              }
            >
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {topic.topicNumber === 1 && <Atom className="w-6 h-6" />}
                    {topic.topicNumber === 2 && <Beaker className="w-6 h-6" />}
                    {topic.topicNumber === 3 && (
                      <FlaskConical className="w-6 h-6" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold">
                        Topic {topic.topicNumber}
                      </h3>
                      <p className="text-sm opacity-90">{topic.title}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {topic.bullets.length}
                  </div>
                </div>
              </div>

              {/* Topic Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{topic.subTitle}</p>

                {selectedTopic === topic.topicNumber && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    {topic.bullets.map((bullet, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {bullet.heading}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {bullet.subHeading}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Complete Coverage Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Atom className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Inorganic Chemistry
              </h4>
              <p className="text-gray-600 text-sm">
                Periodic table, bonding, coordination compounds, and metallurgy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Beaker className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Physical Chemistry
              </h4>
              <p className="text-gray-600 text-sm">
                Atomic structure, thermodynamics, kinetics, and electrochemistry
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FlaskConical className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Organic Chemistry
              </h4>
              <p className="text-gray-600 text-sm">
                Hydrocarbons, functional groups, biomolecules, and polymers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
