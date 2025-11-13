import { conmysql } from "../db.js";

// 📌 Obtener todas las categorías
export const getCategorias = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM categorias');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al consultar categorías" });
    }
};

// 📌 Obtener una categoría por ID
export const getCategoriaById = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'SELECT * FROM categorias WHERE cat_id = ?',
            [req.params.id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Categoría no encontrada" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// 📌 Registrar categoría
export const postCategoria = async (req, res) => {
    try {
        const { cat_nombre, cat_descripcion } = req.body;

        const [row] = await conmysql.query(
            'INSERT INTO categorias(cat_nombre, cat_descripcion) VALUES(?, ?)',
            [cat_nombre, cat_descripcion]
        );

        res.json({
            id: row.insertId,
            message: "Categoría registrada"
        });

    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// 📌 Actualizar categoría
export const putCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { cat_nombre, cat_descripcion } = req.body;

        const [result] = await conmysql.query(
            `UPDATE categorias 
             SET cat_nombre = ?, cat_descripcion = ?
             WHERE cat_id = ?`,
            [cat_nombre, cat_descripcion, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Categoría no encontrada" });

        res.json({ message: "Categoría actualizada" });

    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

// 📌 Eliminar categoría
export const deleteCategoria = async (req, res) => {
    try {
        const [result] = await conmysql.query(
            'DELETE FROM categorias WHERE cat_id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Categoría no encontrada" });

        res.json({ message: "Categoría eliminada" });

    } catch (error) {
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};
