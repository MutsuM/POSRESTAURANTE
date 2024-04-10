import { CategoryDTO } from "../interfaces/CategoryDTO";

export const CategoryTransformer = (category: CategoryDTO) => {
    return {
        idCategoria: category.categoryId,
        descripcion: category.description,
        color: category.color,
        comision: category.commission
    }
}

export const CategoriesTransformer = (category: any[]) => {
    return category.map((e) => {
        return {
            categoryId: e.idCategoria,
            description: e.descripcion,
            color: e.color,
            commission: e.comision
        }
    });
}