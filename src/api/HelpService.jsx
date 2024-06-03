import { Axios } from "./Axios";

const HelpService = {
    loadCategories: async ({ setCategories }) => {
        try {
            var response = await Axios.get("/company/help/categories");
            if(response.data["code"] === 200) {
                setCategories(response.data["data"])
                return response.data["data"]
            } else {
                return null
            }
        } catch (_) {
            return null
        }
    },

    loadCategory: async ({ category, setCategory }) => {
        try {
            var response = await Axios.get(`/help/category?key=${ category }`);
            if(response.data["code"] === 200) {
                setCategory(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    loadSections: async ({ category, setSections }) => {
        try {
            var response = await Axios.get(`/company/help/sections?key=${ category }`);
            if(response.data["code"] === 200) {
                setSections(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    loadSection: async ({ section, setSection }) => {
        try {
            var response = await Axios.get(`/company/help/section?key=${ section }`);
            if(response.data["code"] === 200) {
                setSection(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    loadGroups: async ({ category, section, setGroups }) => {
        try {
            var response = await Axios.get(`/company/help/groups?category=${ category }&section=${ section }`);
            if(response.data["code"] === 200) {
                setGroups(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    loadHelp: async ({ id, setHelp }) => {
        try {
            var response = await Axios.get(`/company/help?id=${ id }`);
            if(response.data["code"] === 200) {
                setHelp(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    search: async ({ query, setResult }) => {
        try {
            var response = await Axios.get(`/company/help/search?q=${ query }`);
            if(response.data["code"] === 200) {
                setResult(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },

    submitQuery: async ({ emailAddress, fullName, comment }) => {
        try {
            var response = await Axios.post("/company/help/ask", {
                "email_address": emailAddress,
                "full_name": fullName,
                "comment": comment
            }
            );
            if(response.data["code"] === 200) {
                setResult(response.data["data"])
                return true
            } else {
                return false
            }
        } catch (_) {
            return false
        }
    },
}

export default HelpService;