import { useState, useEffect } from 'react';

const useFilterMentors = (mentors, filters) => {
  const [filteredMentors, setFilteredMentors] = useState(mentors);

  useEffect(() => {
    let currentFiltered = [...mentors]; // Start with a fresh copy of mentors

    // Search filter
    if (filters.search) {
      currentFiltered = currentFiltered.filter(mentor =>
        mentor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Skill filter
    if (filters.skill) {
      currentFiltered = currentFiltered.filter(mentor =>
        mentor.skills.includes(filters.skill)
      );
    }

    // Rating filter
    if (filters.rating) {
      currentFiltered = currentFiltered.filter(mentor =>
        mentor.rating >= parseFloat(filters.rating)
      );
    }

    // Experience filter
    if (filters.experience) {
      currentFiltered = currentFiltered.filter(mentor => {
        const mentorYearsStr = mentor.experience.split(' ')[0]; // "8 years" -> "8"
        const mentorYears = parseInt(mentorYearsStr);

        switch (filters.experience) {
          case '1-3':
            return mentorYears >= 1 && mentorYears <= 3;
          case '4-6':
            return mentorYears >= 4 && mentorYears <= 6;
          case '7+':
            return mentorYears >= 7;
          default:
            return true;
        }
      });
    }

    setFilteredMentors(currentFiltered);
  }, [mentors, filters]); // Re-run when mentors or filters change

  return filteredMentors;
};

export default useFilterMentors;