import { getFacultyById, getSortedFaculty, getFacultyBySlug } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = async(req, res) => {
    

    // Handle sorting if requested
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const sortedFaculty = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Department Faculty',
        faculty: sortedFaculty,
        currentSort: sortBy,
    });
};

const facultyDetailPage = async(req, res, next) => {
    const facultySlug = req.params.slugId;
    const facultyMember = await getFacultyBySlug(facultySlug);


    // If faculty doesn't exist, create 404 error
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        name: `${facultyMember.name}`,
        title: `${facultyMember.title}`,
        faculty: { ...facultyMember },
        office: `${facultyMember.office}`,
        phone: `${facultyMember.phone}`,
        email: `${facultyMember.email}`,
        department: `${facultyMember.department}`,
        title: `${facultyMember.title}`
    });
};

 export { facultyListPage, facultyDetailPage };