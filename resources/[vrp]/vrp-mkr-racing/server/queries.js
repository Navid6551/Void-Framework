const loadRaces = async () => {
    const results = await SQL.execute("SELECT * FROM _race_track");
    if (!results || !Array.isArray(results)) return null;
    return results;
};

const deleteRaceById = async (id) => {
    const results = await SQL.execute("DELETE FROM _race_track WHERE id = @id", {
        id: id
    });
    if (!results) return false;
    return true;
}