import React from 'react';
import PieChart from '../../DashboardView/Diagram/PieChart/PieChart';
import renderer from 'react-test-renderer';

const chartLabels = ["ERROR", "ERROR", "RUNNING"];
const chartData = [2, 3, 5];
let instance;

test("Correct drawing of PieChart", () => {
    const component = renderer.create(
        <PieChart
            ref={(child) => {instance = child}}
            chartData={chartLabels}
            chartLabels={chartData}
            onStateExcludeInput={() => {/* do nothing in case of test */}}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
}); 

test("Correct extraction of data for displaying", () => {
    const results = instance.getDisplayDataOf(chartData);
    expect(results).toEqual([0.2, 0.3, 0.5]);
});

test("Correct extraction of data for displaying", () => {
    const results = instance.getColors(chartLabels);
    expect(results).toEqual(["#D33F49", "#D33F49", "#9FAB61"]);
});